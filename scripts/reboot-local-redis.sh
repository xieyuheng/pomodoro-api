rm -f /home/xyh/redis/data/*
docker rm -f redis-stack-server
docker run -d -v /home/xyh/redis/data/:/data -v /home/xyh/redis/redis.conf:/redis-stack.conf --name redis-stack-server -p 6379:6379 redis/redis-stack-server:latest
