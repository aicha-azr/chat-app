const { supabase } = require("../config/supabase");

const Messages = {
    getMessages: async (req, res) => {
        try{
            const response = await supabase
            .from("messages")
            .select("*")
            if(response.error){
                return res.status(400).json({error: response.error.message});
            }
            return res.status(200).json(response.data);
        }catch(error){
           return res.status(500).json({error: error});
        }
    },
    getOne : async(req,res)=>{
        const {id} = req.params;
        if(!id){
            return res.status(400).json({error:'Please provide an id'});
        }
        try{
            const response = await supabase
            .from('messages')
            .select('*')
            .eq('id',id);
            if(response.error){
                return res.status(400).json(response.error);
            }
            return res.status(200).json(response.data);
        }catch(err){
            return res.status(500).json({error: err});
        }
    },
    addOne : async(req,res)=>{
        try{
            const response = await supabase.from("messages").insert(req.body);
            if(response.error){
                return res.status(400).json(response.error);
            }
            return res.status(200).json(response.data);
        }catch(err){
            return res.status(500).json({error: err});
        }
    }
}
module.exports = Messages;