import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model{
    static init(sequelize){
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
            }  ,
            {
                sequelize,
            }
        );
        this.addHook('beforeSave', async (user)=> {
            // crypt password before save in database
            if(user.password) user.password_hash = await bcrypt.hash(user.password, 8);
        });
        return this;
    };

    checkPassword(password){
        return bcrypt.compare(password, this.password_hash);
    }
}

export default User;