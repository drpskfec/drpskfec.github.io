require_relative 'google_scholar'
require 'http-cookie'
require 'yaml'

AUTHOR_ID = 'Nx2gTocAAAAJ'
DESTINATION_YAML = File.join '_data', 'publication.yaml'

COOKIES_FILE = 'cookies.txt'
jar = HTTP::CookieJar.new
jar.load(COOKIES_FILE, format: :cookiestxt)if File.file?(COOKIES_FILE)


pubs = Scholar.new(AUTHOR_ID, jar).publications
filtered_pubs = pubs.map {|p|
  p.collect{|k,v|
    p k
    if k == :publisher
      [k.to_s, v.collect{|k, v| [k.to_s, v]}.to_h]
    else
      [k.to_s, v]
    end
  }.to_h
}
File.write(DESTINATION_YAML, filtered_pubs .to_yaml)
