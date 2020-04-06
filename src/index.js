/* eslint-disable-next-line import/no-unresolved */
import '@babel/polyfill';
import Phaser from 'phaser';
import config from './config/config';

window.game = new Phaser.Game(config);