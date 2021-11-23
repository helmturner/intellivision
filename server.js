'use strict';

import express from 'express';
import { annotate } from './vision.js';

export const app = express();
export const port = process.env.PORT || 8080;

// Routes
app.get('/', function (req, res) {
  res.sendStatus(200);
});

app.get('/:feat/:filename', function (req, res){
  const uri = `gs://video-annotation/${req.params.filename}`;
  let features = [];

  switch (req.params.feat) {
    case 'logos': features = ['LOGO_RECOGNITION']; break;;
    case 'labels': features = ['LABEL_DETECTION']; break;;
    case 'text': features = ['TEXT_DETECTION']; break;;
    case 'all': features = ['LOGO_RECOGNITION', 'LABEL_DETECTION', 'TEXT_DETECTION']; break;;
    default: throw new Error('Unknown Feature Endpoint');
  }

  try {
    const annotated = annotate(uri, features);
    return res
      .status(200)
      .type('application/json')
      .send(JSON.stringify(annotated));
  } catch {
    return res.sendStatus(404);
  }
});