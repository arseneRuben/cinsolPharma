const Person = require('../models/person.model');
const User = require('../models/user.model');
const Role = require('../models/role.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

exports.signupPerson = async (req, res) => {
  try {
    // Créez un utilisateur avec les informations d'authentification
    const user = await User.create({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8) // Hash du mot de passe
    });

    // Créez une personne avec les autres informations
    const person = await Person.create({
      typeId: req.body.typeId,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      primary_contact: req.body.primary_contact,
      address: req.body.address,
      secondary_contact: req.body.secondary_contact,
      other_informations: req.body.other_informations,
      birthday: req.body.birthday,
      gender: req.body.gender,
      birthplace: req.body.birthplace,
      userId: user.id // Liez la personne à l'utilisateur créé
    });

    // Assignez un rôle en fonction du typeId (vous devez implémenter votre propre logique ici)
    let roleId;
    switch (req.body.typeId) {
      case 1: // Patient simple
      case 2: // Patient famille
        roleId = 2; // Choisir le rôle correspondant aux patients
        break;
      case 3: // Fournisseur
        roleId = 3; // Choisir le rôle correspondant aux fournisseurs
        break;
      default:
        roleId = 1; // Rôle par défaut pour les autres cas
    }

    // Trouvez le rôle dans la base de données
    const role = await Role.findOne({ where: { id: roleId } });

    // Associez le rôle à l'utilisateur
    await user.setRoles([role]);

    // Associez le rôle à la personne
    await person.setRoles([role]);

    res.send({ message: 'Person was registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred during signup.' });
  }
};

exports.signinPerson = async (req, res) => {
  try {
    const person = await Person.findOne({
      where: { email: req.body.email },
      include: [User, Role]
    });

    if (!person) {
      return res.status(404).send({ message: 'Person Not found.' });
    }

    const user = person.user;

    if (!user) {
      return res.status(404).send({ message: 'User Not found for the person.' });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: 'Invalid Password!' });
    }

    const token = jwt.sign(
      { id: user.id },
      config.secret,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400 // 24 hours
      }
    );

    // Obtenez les rôles de l'utilisateur
    const roles = await user.getRoles();

    var authorities = [];
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }

    // Vous pouvez ajouter d'autres informations nécessaires à votre réponse ici
    res.status(200).send({
      id: person.id,
      email: person.email,
      roles: authorities,
      accessToken: token,
      message: 'Person was signed in successfully!'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred during signin.' });
  }
};
