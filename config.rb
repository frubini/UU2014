require 'compass/import-once/activate'
# Require any additional compass plugins here.

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "css"
sass_dir = "scss"
images_dir = "images"
javascripts_dir = "js"
fonts_dir = "fonts"

output_style = :nested
environment = :development

relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = true
color_output = false

preferred_syntax = :scss


# at the same tiem compile a production version of css. (css/production/style.css)
on_stylesheet_saved do
  `compass compile -c config_prod.rb --force`
end