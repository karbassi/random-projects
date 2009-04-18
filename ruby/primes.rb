class Primes
  attr_reader :primes

  def initialize(len = nil)
    return nil if len.nil?

    state = Numeric.new
    @primes = [2, 3]

    i = 4
    count = 0
    while count < len.abs - 2
      (2..(Math.sqrt(i).ceil)).each do
         |x|
         state = true
         if (i.divmod(x)[1] == 0)
            state = false
            break
         end
      end

      if state
        @primes << i
        count +=1
      end
      i += 1
    end

    return @primes
  end
end

p = Primes.new(10)
puts p.primes

# Output
# ------
# 2
# 3
# 5
# 7
# 11
# 13
# 17
# 19
# 23
# 29