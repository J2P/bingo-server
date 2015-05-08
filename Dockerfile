FROM 		node:0.10.38

RUN			npm install -g pm2
RUN 		npm install -g gulp

WORKDIR /home/service/bingo
ADD			package.json /home/service/bingo/package.json
RUN			npm install

ADD			. ./

CMD 		pm2 start --no-daemon index.js