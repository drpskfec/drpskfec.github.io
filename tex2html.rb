require 'nokogiri'

TEX_FILES = ['journals', 'conferences', 'books', 'confmgmt', 'invitedtalks', 'academicactivities', 'administrativeactivities', 'awards', 'programsattended', 'expertcommittees', 'visitsabroad', 'membership', 'mtechcompleted', 'phdcompleted', 'sponsoredproj', 'phdongoing', 'mtechongoing', 'coursesdeveloped']

css_coll = ""
Dir.chdir("#{File.dirname(__FILE__)}/_tex/") do
	TEX_FILES.each do |name|
		puts "----------------------------"
		puts "parsing #{name}"
		puts "----------------------------"
		system("htlatex #{name}_html.tex")
		doc = File.open("#{name}_html.html") { |f| Nokogiri::HTML::Document.parse f.read }
		#print doc
		body = doc.at_css "body"
		body.name = "div"

		File.open("../_includes/#{name}.html", 'w') { |f| f.write body.to_html }
		
		css_coll << File.open("#{name}_html.css") { |f| f.read }
	end
end

File.open("#{File.dirname(__FILE__)}/assets/css/tex.css", 'w') { |f| f.write css_coll }