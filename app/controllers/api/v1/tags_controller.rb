class Api::V1::TagsController < ApplicationController
  def index
    tags = Tag.all.order(created_at: :desc)
    render json: tags
  end

  def create
    tag = Tag.create!(tag_params)
    if tag
      render json: tag
    else
      render json: tag.errors
    end
  end

  def show
    if tag
      render json: tag
    else
      render json: tag.errors
    end
  end

  def destroy
    tag&.destroy
    render json: { message: 'Tag deleted!' }
  end

  def markCompleted
    tag.update_attribute(:completed, true)
    render json: { message: 'Tag marked completed!'}
  end

  def markIncomplete
    tag.update_attribute(:completed, false)
    render json: { message: 'Tag marked incomplete!'}
  end

  private

  def tag_params
    params.require(:tag).permit(:title, :completed)
  end

  def tag
    @tag ||= Tag.find(params[:id])
  end
end
