@echo off
set /p externalPort=Saisir le port externe: 
set /p internalPort=Saisir le port interne: 
node proxy.js %internalPort% %externalPort%