import Entrees_Apero from '../../images/Entrees_Apero.png'
import Entrees_Salade from '../../images/Entrees_Salade.png'
import Entrees_Soupe from '../../images/Entrees_Soupe.png'
import Entrees_Verrines from '../../images/Entrees_Verrines.png'
import Plats_pates from '../../images/Plats/Plats_pates.png'
import Plats_poivre from '../../images/Plats/Plats_poivre.png'
import Plats_salade from '../../images/Plats/Plats_salade.png'
import Plats_saumon from '../../images/Plats/Plats_saumon.png'
import Plats_veggie from '../../images/Plats/Plats_veggie.png'
import Plats_viande from '../../images/Plats/Plats_viande.png'
import Desserts_fraise from '../../images/Desserts/Desserts_fraise.png'
import Desserts_framboise from '../../images/Desserts/Desserts_framboise.png'
import Desserts_gateaux from '../../images/Desserts/Desserts_gateaux.png'
import Desserts_patisserie from '../../images/Desserts/Desserts_patisserie.png'
import Desserts_salades from '../../images/Desserts/Desserts_salades.png'
import Desserts_tarte from '../../images/Desserts/Desserts_tarte.png'
import Boissons_cocktail from '../../images/Boissons/Boissons_cocktail.png'
import Boissons_milkshake from '../../images/Boissons/Boissons_milkshake.png'
import Boissons_smoothie from '../../images/Boissons/Boissons_smoothie.png'
import Sauces_salade from '../../images/Sauces/Sauces_salade.png'
import Sauces_salees from '../../images/Sauces/Sauces_salees.png'
import Sauces_sucrees from '../../images/Sauces/Sauces_sucrees.png'

const CategoriesDatas = {
    entrees: [
        {
            category: `entrees`,
            title: "Salades",
            image: Entrees_Salade,
            text: "Ici vous trouverez toutes nos recettes de salades, aussi délicieuses les unes que les autres. Il y en a pour tous les goûts, pour chaque période de l’année.",
            button: "Voir nos salades",
            search: "salade",
        },
        {
            category: `entrees`,
            title: "soupes",
            image: Entrees_Soupe,
            text: "Ici vous trouverez toutes nos soupes, chaudes et froides, il y en a pour chaque saison. Venez vous régaler en explorant nos délicieuses recettes !",
            button: "Voir nos soupes",
            search: "soupe",
        },
        {
            category: `entrees`,
            title: "Verrines",
            image: Entrees_Verrines,
            text: "Les verrines sont parfaites pour une entrée réussie, ou même pour un bon apéro en famille. Vous trouverez ici des verrines salées, sucrées, toujours aussi excellentes !",
            button: "Voir nos verrines",
            search: "verrine",
        },
        {
            category: `entrees`,
            title: "Apéritifs",
            image: Entrees_Apero,
            text: "Un apéritif est toujours une partie de bonheur. Entre amis comme en famille, il se fait toujours désirer. N’hésitez pas, venez gouter à nos délices !",
            button: "Voir nos apéritifs",
            search: "aperitif",
        },
    ],
    plats: [
        {
            category: `plats`,
            title: "Viande"
        }
    ]
}

export default CategoriesDatas
