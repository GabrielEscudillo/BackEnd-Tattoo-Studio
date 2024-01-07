#Crear migraciones para MI App, con mis Entidades
npx typeorm migration:create ./src/database/migrations/CreateRoles
npx typeorm migration:create ./src/database/migrations/CreateUsers
npx typeorm migration:create ./src/database/migrations/CreateAppointments
npx typeorm migration:create ./src/database/migrations/CreateArtists
npx typeorm migration:create ./src/database/migrations/CreateDesigns

# Crear modelos para MI App, con mis Entidades
npx typeorm entity:create ./src/models/Role
npx typeorm entity:create ./src/models/User
npx typeorm entity:create ./src/models/Artist
npx typeorm entity:create ./src/models/Appointment
npx typeorm entity:create ./src/models/Design


