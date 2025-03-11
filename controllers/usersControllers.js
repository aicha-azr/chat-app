const { supabase } = require("../config/supabase");

const users = {
    getUsers: async(req,res)=>{
        try{
            const response = await supabase
            .from('users')
            .select('*');
            if(response.error){
                return res.status(400).json(response.error);
            }
            return res.status(200).json(response.data);
        }catch(err){
            console.error(err.message);
        }
    },
    getOne : async(req,res)=>{
        const {id} = req.params;
        if(!id){
            return res.status(400).json({error:'Please provide an id'});
        }
        try{
            const response = await supabase
            .from('users')
            .select('*')
            .eq('id',id);
            if(response.error){
                return res.status(400).json(response.error);
            }
            return res.status(200).json(response.data);
        }catch(err){
            console.error(err.message);
        }
    },
    updateOne : async(req,res)=>{
        const {id} = req.params;
        if(!id){
            return res.status(400).json({error:'Please provide an id'});
        }
        try{
            const response = await supabase
            .from('users')
            .update(req.body)
            .eq('id',id);
            if(response.error){
                return res.status(400).json(response.error);
            }
            return res.status(200).json(response.data);
        }catch(err){
            console.error(err.message);
        }
    },
}
module.exports = users;