# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180514061607) do

  create_table "action_logs", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "action"
    t.string   "content"
    t.integer  "todo_list_id"
    t.integer  "logable_id"
    t.string   "logable_type"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["todo_list_id"], name: "index_action_logs_on_todo_list_id"
    t.index ["user_id"], name: "index_action_logs_on_user_id"
  end

  create_table "participants", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "list_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["list_id"], name: "index_participants_on_list_id"
    t.index ["user_id"], name: "index_participants_on_user_id"
  end

  create_table "todo_list_items", force: :cascade do |t|
    t.integer  "todo_list_id"
    t.text     "content"
    t.boolean  "finished"
    t.string   "lock_version"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.boolean  "is_delete",    default: false
    t.index ["todo_list_id"], name: "index_todo_list_items_on_todo_list_id"
  end

  create_table "todo_lists", force: :cascade do |t|
    t.string   "name"
    t.string   "short_cut"
    t.integer  "owner_id"
    t.string   "lock_version"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["owner_id"], name: "index_todo_lists_on_owner_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "sub"
    t.string   "email"
    t.string   "token"
    t.string   "color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
