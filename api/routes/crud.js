var exports = module.exports = {};

var _attachList = function(type, router, model) {
  router.get('/', function(req, res) {
    model.find(function(err, models) {
      if (err) {
        return res.send(err);
      }
      var json = {};
      json[type + 's'] = models;
      res.json(json);
    });
  });
};

var _attachGet = function(type, router, model) {
  router.get('/:id', function(req, res) {
    model.findOne({_id: req.params.id}, function(err, dbModel) {
      if (err) {
        return res.send(err);
      }
      var json = {};
      json[type] = dbModel;
      res.json(json);
    });
  });
};

var _attachCreate = function(type, router, model) {
  router.post('/', function(req, res) {
      var reqModel = req.body[type];
      if (!reqModel) {
        return res.status(500).send({
          success: false,
          message: type + ' undefined'
        });
      }
      model.create(reqModel, function(err, object) {
        if (err) {
          return res.send(err);
        }
        res.send({
          message: type + ' created'
        });
      });
    });
};

var _attachUpdate = function(type, router, model) {
  router.put('/', function (req, res) {
    var reqModel = req.body[type];
    model.update({
      _id: reqModel._id
    }, reqModel, {
      upsert: true
    }, function (err) {
      if (err) {
        return res.send(err);
      }
      res.send({
        message: type + ' updated'
      });
    });
  });
};

var _attachDelete = function(type, router, model) {
 router.delete('/:id', function(req, res) {
    model.remove({
      _id: req.params.id
    }, function(err) {
      if (err) {
        return res.send(err);
      }
      res.json({
        message: type + ' deleted'
      });
    });
  });
};

exports.attach = function(type, router, model) {
  _attachList(type, router, model);
  _attachGet(type, router, model);
  _attachCreate(type, router, model);
  _attachUpdate(type, router, model);
  _attachDelete(type, router, model);
};

module.exports = exports;
