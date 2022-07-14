import passport from 'passport';
const LocalStrategy=require('passport-local').Strategy;
import { User } from "../models/User";
import {encryptPassword, matchPassword}from '../helpers/encrypterpass.js'

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'

},async(email, password, done)=>{
    let user=await User.findOne({ where: { email: email } })
    if(user.length==0){
        return done(null, false, {message: "El usuario no existe"})
    }else{
        let match = await matchPassword(password, user.password);
        if(!match){
        return done(null, false, {message: "Contraseña incorrecta"})
        }else{
            return done(null, user)
        }
    }
}));

passport.serializeUser((user, done)=>{
    done(null, user.id)
})

passport.deserializeUser(async(id, done)=>{
    let user= await User.findOne({ where: { id: id } })
    if(user.length>0){
        done(null, user)
    }
})