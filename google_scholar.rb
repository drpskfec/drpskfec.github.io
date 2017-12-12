# frozen_string_literal: true

require 'net/http'
require 'json'
require 'nokogiri'
require 'fileutils'

SCHOLAR_URL = 'https://scholar.google.co.in/citations'
CACHE_DIR = '_scholar_cache'

def req_with_cookies(uri, jar)
  req = Net::HTTP::Get.new(uri)
  req['Cookie'] = HTTP::Cookie.cookie_value(jar.cookies(uri))


  Net::HTTP.start(uri.hostname, uri.port,
                        :use_ssl => uri.scheme == 'https') {|http|
    http.request(req)
  }
end


class Publication
  def initialize(id, jar = nil)
    @id = id
    @jar = jar
    @publication = nil
  end

  def details(title = nil, citations = nil)
    return @publication if @publicaition
    cache_file = File.join CACHE_DIR, @id.sub(':', '_')
    if citations && File.file?(cache_file)
      body = File.read(cache_file)
      @publication = parse_details body, title
      @publication[:citations] = citations
    else
      body = fetch_details
      File.write(cache_file, body)
      @publication = parse_details body, title
    end
    @publication
  end

  private
  def fetch_details
    sleep 3
    params = {
      view_op: 'view_citation',
      hl: 'en',
      'oe': 'ASCII',
      citation_for_view: @id
    }

    uri = URI(SCHOLAR_URL)
    uri.query = URI.encode_www_form(params)
    req_with_cookies(uri, @jar).body
  end

  def parse_details body, title
    body.force_encoding("ISO-8859-1").encode!("utf-8", invalid: :replace)
    fragment = Nokogiri::HTML.fragment(body)
    paper_link = fragment.xpath( './/a[@href]' ).first

    authors = fragment.search('div[text()="Authors"] ~ *').first.text
    pub_date = fragment.search('div[text()="Publication date"] ~ *').first
    pub_date = pub_date ? pub_date.text : "1/1/1970"
    pub_date = "1/1/#{pub_date}" if pub_date.length == 4  #only year
    pub_date = Date.parse(pub_date)
    location = parse_publisher(fragment)
    desc = get_sibling_value fragment, "Description"
    #puts fragment.to_xhtml( indent:3 )
    # citations = get_sibling_value fragment, "Description"
    cite_node = fragment.xpath('.//div[normalize-space(text())="Total citations"]/following-sibling::div//a')
    citations = cite_node.length > 0 ? cite_node.first.text[8..-1].to_i : 0
    unless title
      title = paper_link ? paper_link.text : fragment.css("div#gsc_vcd_title").text
    end
    url = paper_link ? paper_link.attribute('href').value : nil

    {
      id: @id,
      title: title,
      url: url,
      authors: authors,
      date: pub_date,
      year: pub_date.year,
      publisher: location,
      description: desc,
      citations: citations
    }
  end

  def get_sibling_value doc, title
    node = doc.search("div[text()=\"#{title}\"] ~ *").first
    node ? node.text : ""
  end

  def parse_publisher doc
    res = {}
    if doc.search('div[text()="Conference"]').length > 0
      res[:type] = "conference"
      res[:name] = get_sibling_value doc, "Conference"
    elsif doc.search('div[text()="Journal"]').length > 0
      res[:type] = "journal"
      res[:name] = get_sibling_value doc, "Journal"
      res[:volume] = get_sibling_value doc, "Volume"
      res[:issue] = get_sibling_value doc, "Issue"
    elsif doc.search('div[text()="Book"]').length > 0
      res[:type] = "book"
      res[:name] = get_sibling_value doc, "Book"
    else
      res[:type] = :unknown
    end
    res[:pages] = get_sibling_value doc, "Pages"
    res[:publisher] = get_sibling_value doc, "Publisher"
    res
  end
end

class Scholar
  def initialize(id, jar)
    @id = id
    @jar = jar
    @publications = nil
  end

  def publications
    return @publications if @publications

    details = fetch_details
    @publications = parse_details details
  end

  private
  def parse_details details
    details.encode!('UTF-8', 'UTF-8', invalid: :replace)
    fragment = Nokogiri::HTML.fragment(details)

    FileUtils::mkdir_p CACHE_DIR
    fragment.xpath('./tr').map do |tr|
      title, citations = tr.children.css('td a')

      uri = URI( title.attribute('data-href'))
      id = URI::decode_www_form(uri.query).to_h['citation_for_view']
      begin
        p Publication.new(id, @jar).details(title.text, citations.text.to_i)
      rescue
        puts "Failed to parse #{id}"
        raise
      end
    end
  end
  def fetch_details
    uri = URI(SCHOLAR_URL)
    params = {
      hl: 'en',
      user: @id,
      view_op: 'list_work',
      sortby: 'pubdate',
      cstart: 0,
      pagesize: 80,
      json: 1
    }

    ret = String.new
    loop do
      uri.query = URI.encode_www_form(params)
      res = req_with_cookies(uri, @jar)
      json = JSON.parse(res.body)
      ret << json['B']
      break unless json['N']
      params[:cstart] = params[:cstart] + params[:pagesize]
    end

    ret
  end
end
