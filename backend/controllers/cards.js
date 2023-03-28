const Card = require("../models/card");
const ErrorNotFound = require("../errors/ErrorNotFound");
const ErrorValidation = require("../errors/ErrorValidation");
const ErrorForbidden = require("../errors/ErrorForbidden");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new ErrorValidation("Data for creating card is not valid."));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new ErrorNotFound(
        `Card with id ${req.params.cardId} for user ${req.user._id} is not found.`
      );
    })
    .then((card) => {
      if (req.user._id !== card.owner.toString()) {
        throw new ErrorForbidden("You can delete just your cards.");
      }
      Card.deleteOne({ _id: req.params.cardId }).then(() =>
        res.send({ data: card })
      );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new ErrorValidation(`Invalid id ${req.params.cardId}`));
      } else if (err.name === "ValidationError") {
        next(new ErrorValidation("Invalid data."));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new ErrorNotFound(
        `Card with id ${req.params.cardId} is not found.`
      );
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new ErrorValidation(`Invalid id ${req.params.cardId}`));
      } else if (err.name === "ValidationError") {
        next(new ErrorValidation("Invalid data"));
      } else {
        next(err);
      }
    });

module.exports.dislikeCard = (req, res, next) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new ErrorNotFound(
        `Card with id ${req.params.cardId} is not found.`
      );
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new ErrorValidation(`Invalid id ${req.params.cardId}`));
      } else if (err.name === "ValidationError") {
        next(new ErrorValidation("Invalid data"));
      } else {
        next(err);
      }
    });
