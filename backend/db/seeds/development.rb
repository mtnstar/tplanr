def load_fixtures
  puts 'Seeding all fixtures...'

  require 'active_record/fixtures'

  fixtures_dir = Rails.root.join('spec/fixtures').to_s

  # The use of String#[] here is to support namespaced fixtures.
  fixture_files = Dir["#{fixtures_dir}/**/*.yml"].map { |f| f[(fixtures_dir.size + 1)..-5] }

  ActiveRecord::FixtureSet.create_fixtures(fixtures_dir, fixture_files)
end

load_fixtures
