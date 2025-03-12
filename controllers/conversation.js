Conversations = {
  getAll: async (req, res) => {
    try {
      const response = await supabase.from("conversation").select("*");
      if (response.error) {
        return res.status(400).json(response.error);
      }
    } catch (err) {
      console.error(err.message);
    }
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Please provide an id" });
    }
    try {
      const response = await supabase
        .from("conversations")
        .select("*")
        .eq("id", id);
      if (response.error) {
        return res.status(400).json(response.error);
      }
      return res.status(200).json(response.data);
    } catch (err) {
      console.error(err.message);
    }
  },
  createOne: async (req, res) => {
        try {
        const response = await supabase.from("conversations").insert(req.body);
        if (response.error) {
            return res.status(400).json(response.error);
        }
        return res.status(200).json(response.data);
        } catch (err) {
        console.error(err.message);
        }
    }
};
module.exports = Conversations;
