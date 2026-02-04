export default class ValidationController {
  list = async (req, res) => {
    res.json({ items: [] });
  };

  create = async (req, res) => {
    res.status(201).json({ id: "temp-id", ...req.body });
  };

  get = async (req, res) => {
    res.json({ id: req.params.id });
  };

  update = async (req, res) => {
    res.json({ id: req.params.id, ...req.body });
  };

  delete = async (req, res) => {
    res.status(204).send();
  };
}
