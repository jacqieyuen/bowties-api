class CreateBowties < ActiveRecord::Migration[5.0]
  def change
    create_table :bowties do |t|
      t.string :material
      t.string :pattern
      t.string :style
      t.string :image_url
      t.float :wholesale_price
      t.float :retail_price

      t.timestamps
    end
  end
end
