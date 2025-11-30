FROM node:18

WORKDIR /app

# copiar dependencias
COPY package.json package-lock.json* ./
RUN npm install

# copiar resto de archivos
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
