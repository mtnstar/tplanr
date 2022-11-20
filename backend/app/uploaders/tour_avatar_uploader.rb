class TourAvatarUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :file

  def extension_allowlist
    %w(jpg jpeg png)
  end

  def content_type_allowlist
    /image\//
  end

  def store_dir
    "./uploads/#{model.class.name.underscore.pluralize}/#{model.id}/"
  end

  process resize_to_fill: [800, 800]

  version :thumb do
    process resize_to_fill: [200,200]
  end
end
