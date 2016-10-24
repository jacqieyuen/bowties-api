class API::BowtiesController < ApplicationController
  before_action :set_bowtie


  def index
        render json: Bowtie.all
  end
  def show
    render json: @bowtie
  end

  def create
    @bowtie = Bowtie.new(material: params[:material], pattern: params[:pattern], style: params[:style], image_url: params[:image_url], wholesale_price: params[:wholesale_price], retail_price: params[:retail_price])
    if @bowtie.save
      render json: @bowtie
    else
      render json: @bowtie.errors.messages, status:400
    end
  end

  def update
  @bowtie.assign_attributes(material: params[:material], pattern: params[:pattern], style: params[:style], image_url: params[:image_url], wholesale_price: params[:wholesale_price], retail_price: params[:retail_price])
    if @bowtie.save
      render json: @bowtie
    else
      render json: @bowtie.errors.messages, status:400
    end
  end

  def destroy
    if @bowtie.destroy
      puts 'bowtie deleted'
    end
  end

  private

  def set_bowtie
    @bowtie = Bowtie.find_by(id: params[:id])
  end

  def bowtie_params
    params.require(:bowtie).permit(:material, :pattern, :style, :image_url, :wholesale_price, :retail_price)
  end
end
