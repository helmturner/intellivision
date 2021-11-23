#! /usr/bin/env node
//FIXME
'use strict';

import { annotateLabels, annotateLogos, annotateText } from './vision.js';
import { prompt, Separator } from 'inquirer';

const actions = {
  label: label,
  getText: getText,
  findLogos: findLogos,
  exit: process.kill
};

// Start the prompts.
init();

function init () {
  prompt([
    {
      message: 'What would you like to do?',
      name: 'action',
      type: 'list',
      choices: [
        {
          name: 'Detect Logos in an Image',
          value: 'findLogos'
        },
        {
          name: 'Extract Text from an Image',
          value: 'getText'
        },
        {
          name: 'Label an Image',
          value: 'label'
        },
        new Separator(),
        {
          name: 'Exit',
          value: 'exit'
        }
      ]
    }
  ], function (answers) {
    actions[answers.action](answers);
  });
}


function label () {
  prompt({
    message: 'What is the URI of the image you want to label?',
    name: 'uri'
  }, function (answers) {
    if (answers.uri !== '') {
      annotateLabels(answers.uri);
      console.log('"' + answers.uri + '" was successfully processed.\n');
      init();
    } else {
      console.log('Aborted.\n');
      init();
    }
  });
};

function findLogos () {
  prompt({
    message: 'What is the URI of the image you want to detect logos in?',
    name: 'uri'
  }, function (answers) {
    if (answers.uri !== '') {
      annotateLogos(answers.uri);
      console.log('"' + answers.uri + '" was successfully processed.\n');
      init();
    } else {
      console.log('Aborted.\n');
      init();
    }
  });
};

function getText () {
  prompt({
    message: 'What is the URI of the image you want to extract text from?',
    name: 'uri'
  }, function (answers) {
    if (answers.uri !== '') {
      annotateText(answers.uri);
      console.log('"' + answers.uri + '" was successfully processed.\n');
      init();
    } else {
      console.log('Aborted.\n');
      init();
    }
  });
};