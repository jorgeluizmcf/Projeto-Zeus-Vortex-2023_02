-- Criação do usuário 'admin' com senha 'admin' e concessão de privilégios de root
CREATE USER IF NOT EXISTS 'admin'@'%' IDENTIFIED BY 'admin';
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

-- Criação do banco de dados PataFinanceira (caso não exista)
CREATE DATABASE IF NOT EXISTS PataFinanceira;

-- Uso do banco de dados PataFinanceira
USE PataFinanceira;

-- Tabela usuario
CREATE TABLE IF NOT EXISTS usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL
);

-- Tabela pet
CREATE TABLE IF NOT EXISTS pet (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  data_nascimento DATE,
  tipo VARCHAR(100),
  raca VARCHAR(100),
  foto TEXT,
  id_usuario INT,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

-- Tabela despesa
CREATE TABLE IF NOT EXISTS despesa (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipoDespesa INT NOT NULL,
  valorDespesa DECIMAL(10, 2) NOT NULL,
  data DATE,
  id_usuario INT,
  id_pet INT,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id),
  FOREIGN KEY (id_pet) REFERENCES pet(id)
);
