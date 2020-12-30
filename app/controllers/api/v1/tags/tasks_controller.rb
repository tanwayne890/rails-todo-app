class Api::V1::Tags::TasksController < ApplicationController
  def index
    tasks = tag.tasks
    render json: tasks
  end

  def create
    task = Task.create!(task_params)
    if task
      render json: task
    else
      render json: task.errors
    end
  end

  def show
    if task
      render json: task
    else
      render json: task.errors
    end
  end

  def destroy
    task&.destroy
    render json: { message: 'Task deleted!' }
  end

  def markCompleted
    task.update_attribute(:completed, true)
    render json: { message: 'Task marked completed!'}
  end

  def markIncomplete
    task.update_attribute(:completed, false)
    render json: { message: 'Task marked incomplete!'}
  end

  private 
  def tag
    @tag = Tag.find(params[:tag_id])
  end

  def task
    @task ||= tag.tasks.find(params[:id])
  end 

  def task_params
    params.require(:task).permit(:description, :completed, :tag_id)
  end
end
