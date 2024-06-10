#!/bin/bash

# Função para aguardar o banco de dados estar pronto
wait_for_database() {
    echo "Waiting for the database to be ready..."
    echo "$@"
    # Tentando conectar ao banco de dados até que esteja pronto ou o tempo limite seja alcançado
    while [ ! -d "/var/lib/mysql/${MYSQLDB_DATABASE}" ]; do
        echo "Database is not ready yet, waiting..."
        sleep 10
    done

    echo "Database is ready!"
}

# Chama a função para aguardar o banco de dados
wait_for_database

# Executa o comando principal
exec "$@"

