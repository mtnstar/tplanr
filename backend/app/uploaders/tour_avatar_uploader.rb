class TourAvatarUploader < CarrierWave::Uploader::Base
  storage :file

  def extension_allowlist
    %w(jpg jpeg png)
  end

  def content_type_allowlist
    /image\//
  end

  process resize_to_fit: [800, 800]

  version :thumb do
    process resize_to_fill: [200,200]
  end
end
