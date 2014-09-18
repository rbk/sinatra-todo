class System
	def date
		"System date: #{%x[ date ].chomp}"
	end
	def disk_usage
		%x[ du -h ]
	end
end