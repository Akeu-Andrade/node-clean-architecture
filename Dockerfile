FROM node:20.13.1

ADD starts.sh /

RUN chmod +x /starts.sh

CMD ["/starts.sh"]