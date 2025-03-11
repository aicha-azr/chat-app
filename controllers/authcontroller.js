const { supabase } = require("../config/supabase");

const authentication = {
    signIn : async (req, res) => {
        
        try {
          const { email, password } = req.body;
          const response = await supabase.auth.signInWithPassword({
            email,
            password,
          });
      
          console.log("Supabase response:", response);
      
          if (response.error) {
            return res.status(400).json({ error: response.error.message });
          }
      
          const userId = response.data.user.id;
      
          const fetchUser = await supabase
            .from("users")
            .select("*")
            .eq("id", userId)
            .single();
      
          if (fetchUser.error || !fetchUser.data) {
            return res.status(404).json({ error: "User not found in database" });
          }
      
          
      
          res.status(200).json({
            user: {
              ...fetchUser.data
            },
            token: response.data.session.access_token,
            token_expires_in: response.data.session.expires_in,
          });
        } catch (error) {
          console.error("Error during sign-in:", error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      },
    signUp : async (req, res) => {
        try {
          console.log("Request body:", req.body);
      
          const { email, password, name, phone, infos } = req.body;
      
          // Sign up the user with Supabase
          const response = await supabase.auth.signUp({ email, password });
          console.log("Supabase response:", response);
      
          // Handle the case where signUp is successful
          if (response.error) {
            return res.status(400).json({ error: response.error.message });
          }
      
          // Create a user in the database
          const { user } = response.data;
          const createUser = await supabase
            .from("users")
            .insert([
              {
                id: user.id,
                email: email,
                name: name,
                phone,
                infos
              },
            ])
            .select("*");
          if (createUser.error) {
            return res.status(400).json({ error: createUser.error.message });
          }
      
          // Respond with the created user data
          return res.status(200).json({
            message: "User created successfully",
            user: createUser.data[0],
          });
        } catch (error) {
          console.error("Error during sign up:", error);
          return res.status(500).json({ error: "Something went wrong" });
        }
      },
    signOut : async (req, res) => {
        try {
          const response = await supabase.auth.signOut();
          console.log("Supabase response:", response);
      
          if (response.error) {
            return res.status(400).json({ error: response.error.message });
          }
      
          return res.status(200).json({ message: "User signed out successfully" });
        } catch (error) {
          console.error("Error during sign-out:", error);
          return res.status(500).json({ error: "Something went wrong" });
        }
      },
  
}
module.exports = authentication;