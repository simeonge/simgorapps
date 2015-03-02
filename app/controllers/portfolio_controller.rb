class PortfolioController < ApplicationController
  def sudoku
    if request.post?
      @solver = SudokuSolver.new params[:puzzle]
      begin
        @solver.parse!
        @solver.solve!
      rescue
        puts "error"
      end

      # return solution as json
      output = {'sl' => @solver.to_s, 'er' => @solver.errorm}.to_json
      respond_to do |format|
        format.json { render json: output }
      end
    end
  end

  def expense
  end

  def interpreter
  end
end
