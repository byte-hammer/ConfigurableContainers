exports.mod = () => {
    logger.logInfo("[MOD] ConfigurableContainers");

    // Base container ID constants
    // Node_052_MobContainer
    const SECURE_BETA_ID        = "5857a8b324597729ab0a0e7d";
    const SECURE_EPSILON_ID     = "59db794186f77448bc595262";
    const SECURE_GAMMA_ID       = "5857a8bc2459772bad15db29";
    const SECURE_ALPHA_ID       = "544a11ac4bdc2d470e8b456a";
    const SECURE_KAPPA_ID       = "5c093ca986f7740a1867ab12";

    // Node_076_Stash
    const EOD_STASH_ID          = "5811ce772459770e9e5f9532";
    const LB_STASH_ID           = "5811ce572459770cba1a34ea";
    const PFE_STASH_ID          = "5811ce662459770f6f490f32";
    const STANDARD_STASH_ID     = "566abbc34bdc2d92178b4576";

    // Default stash sizes
    const EOD_STASH_SIZE        = 68;
    const LB_STASH_SIZE         = 38;
    const PFE_STASH_SIZE        = 48;
    const STANDARD_STASH_SIZE   = 28;

    // Pockets ID
    const POCKETS_ID            = "557ffd194bdc2d28148b457f";

    let PathResolver = global.internal.path.resolve;

    let settings = require("../settings.json");
    let items = global.fileIO.readParsed(PathResolver('user/cache/items.json'));

    var numStashRowsToAdd = settings.NumStashRowsToAdd;
    var shouldRemoveSecureContainerRestrictions = settings.RemoveSecureContainerRestrictions;

    // Containers
    for (let item in items.data)
    {
        if (item in settings.Containers)
        {
            items.data[item]._props.Grids[0]._props.cellsH = settings.Containers[item].width;
            items.data[item]._props.Grids[0]._props.cellsV = settings.Containers[item].height;
        }
    }

    // Pockets
    if (settings.Pockets.width > 1 || settings.Pockets.height > 1)
    {
        for (let grid in items.data[POCKETS_ID]._props.Grids)
        {
            if (items.data[POCKETS_ID]._props.Grids[grid]._props !== undefined)
            {
                items.data[POCKETS_ID]._props.Grids[grid]._props.cellsH = settings.Pockets.width;
                items.data[POCKETS_ID]._props.Grids[grid]._props.cellsV = settings.Pockets.height;
            }
        }
    }

    // Stash
    if (numStashRowsToAdd > 0)
    {
        items.data[EOD_STASH_ID]._props.Grids[0]._props.cellsV = EOD_STASH_SIZE + numStashRowsToAdd;
        items.data[LB_STASH_ID]._props.Grids[0]._props.cellsV = LB_STASH_SIZE + numStashRowsToAdd;
        items.data[PFE_STASH_ID]._props.Grids[0]._props.cellsV = PFE_STASH_SIZE + numStashRowsToAdd;
        items.data[STANDARD_STASH_ID]._props.Grids[0]._props.cellsV = STANDARD_STASH_SIZE + numStashRowsToAdd;
    }

    // Secure Container Filters
    if (shouldRemoveSecureContainerRestrictions)
    {
        items.data[SECURE_BETA_ID]._props.Grids[0]._props.filters = [];
        items.data[SECURE_EPSILON_ID]._props.Grids[0]._props.filters = [];
        items.data[SECURE_GAMMA_ID]._props.Grids[0]._props.filters = [];
        items.data[SECURE_ALPHA_ID]._props.Grids[0]._props.filters = [];
        items.data[SECURE_KAPPA_ID]._props.Grids[0]._props.filters = [];
    }

    fileIO.write(db.user.cache.items, items);
    logger.logSuccess("[MOD] ConfigurableContainers; Applied");
}