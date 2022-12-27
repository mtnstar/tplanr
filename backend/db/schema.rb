# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_12_27_214227) do
  create_table "item_categories", force: :cascade do |t|
    t.string "label_de"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["label_de"], name: "index_item_categories_on_label_de"
  end

  create_table "item_list_items", force: :cascade do |t|
    t.integer "item_id"
    t.integer "item_list_id"
    t.boolean "optional", default: false
    t.index ["item_id"], name: "index_item_list_items_on_item_id"
    t.index ["item_list_id"], name: "index_item_list_items_on_item_list_id"
  end

  create_table "item_lists", force: :cascade do |t|
    t.integer "tour_id"
    t.integer "sport_kind", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tour_id"], name: "index_item_lists_on_tour_id"
  end

  create_table "items", force: :cascade do |t|
    t.string "label_de", null: false
    t.text "description_de"
    t.integer "user_id"
    t.integer "item_category", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["label_de"], name: "index_items_on_label_de"
    t.index ["user_id"], name: "index_items_on_user_id"
  end

  create_table "sections", force: :cascade do |t|
    t.integer "tour_id"
    t.string "type", null: false
    t.string "label"
    t.string "external_link"
    t.text "details"
    t.integer "distance_km"
    t.integer "climb_up_meters"
    t.integer "climb_down_meters"
    t.datetime "start_at", null: false
    t.datetime "end_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["end_at"], name: "index_sections_on_end_at"
    t.index ["start_at"], name: "index_sections_on_start_at"
    t.index ["tour_id"], name: "index_sections_on_tour_id"
  end

  create_table "tours", force: :cascade do |t|
    t.text "description"
    t.string "external_link"
    t.string "label", null: false
    t.integer "user_id"
    t.integer "sport_kind", default: 0
    t.date "start_at", null: false
    t.date "end_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "avatar"
    t.index ["user_id"], name: "index_tours_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.boolean "admin", default: false, null: false
    t.string "email", null: false
    t.string "encrypted_password", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
