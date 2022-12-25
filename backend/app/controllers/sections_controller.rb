class SectionsController < ApplicationController

  # TODO: read tour_id from url params and not from json-api attributes

  private

  def tour_id
    params(:tour_id)
  end
end
