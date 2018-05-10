module Jekyll
  class ImageTag < Liquid::Tag

    def initialize(tag_name, asset_name, tokens)
      super
      @asset_name = asset_name.gsub("\s",'')
    end

    def render(context)
      assets = context['site']['data']['assets']
      
      "<img src='#{assets[@asset_name]}'>"
    end
  end
end

Liquid::Template.register_tag('img_tag', Jekyll::ImageTag)