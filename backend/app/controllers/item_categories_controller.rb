class ItemCategoriesController < ApplicationController
  before_action :set_item_category, only: %i[ show update destroy ]

  # GET /item_categories
  def index
    @item_categories = ItemCategory.all

    render json: @item_categories
  end

  # GET /item_categories/1
  def show
    render json: @item_category
  end

  # POST /item_categories
  def create
    @item_category = ItemCategory.new(item_category_params)

    if @item_category.save
      render json: @item_category, status: :created, location: @item_category
    else
      render json: @item_category.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /item_categories/1
  def update
    if @item_category.update(item_category_params)
      render json: @item_category
    else
      render json: @item_category.errors, status: :unprocessable_entity
    end
  end

  # DELETE /item_categories/1
  def destroy
    @item_category.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_item_category
      @item_category = ItemCategory.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def item_category_params
      params.require(:item_category).permit(:label_de, :sport_kind)
    end
end
