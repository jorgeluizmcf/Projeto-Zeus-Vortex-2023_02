const handleJsonErrors = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      console.error('Bad JSON');
      return res.status(400).send({ status: 400, message: 'Bad JSON' });
    }
    next();
  };
  
  module.exports = {
    handleJsonErrors
  };