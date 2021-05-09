import Img_entrees from "../../images/Accueil/Img_entrees.png";
import Accueil_haricots from "../../images/Accueil/Accueil_haricots.png";
import Accueil_poivrons from "../../images/Accueil/Accueil_poivrons.png";
import Img_plat from "../../images/Accueil/Img_plat.png";
import Accueil_poulet_haricots from "../../images/Accueil/Accueil_poulet_haricots.png";
import Accueil_salades from "../../images/Accueil/Accueil_salades.png";
import Img_desserts from "../../images/Accueil/Img_desserts.png";
import Accueil_mirabelles from "../../images/Accueil/Accueil_mirabelles.png";
import Accueil_melon from "../../images/Accueil/Accueil_melon.png";
import Img_boissons from "../../images/Accueil/Img_boissons.png";
import Accueil_mojito from "../../images/Accueil/Accueil_mojito.png";
import Accueil_smoothie from "../../images/Accueil/Accueil_smoothie.png";
import Img_sauces from "../../images/Accueil/Img_sauces.png";
import Accueil_herbedeprovence from "../../images/Accueil/Accueil_herbedeprovence.png";
import Accueil_curry from "../../images/Accueil/Accueil_curry.png";

const sections = [
  {
    image: Img_entrees,
    path: "/entrees",
    imageAlt: "Entrées",
    colors: [
      "rgba(54, 121, 13, .77)",
      "#36790D",
    ],
    descriptions: [
      {
        image: Accueil_haricots,
        alt: "Haricots",
        text:
          "Les haricots verts se dégustent pendant les mois de juin, juillet et août. En primeur ils se consomment en mai et septembre. Ils peuvent se déguster froids en salade, avec des poivrons, des anchois, des olives... Chauds, ils constituent un accompagnement savoureux et léger pour les viandes et les poissons.",
        link:
          "https://cutt.ly/QbOik7v",
      },
      {
        image: Accueil_poivrons,
        alt: "Poivrons",
        text:
          "Tous les poivrons sont verts à l’origine, c’est en fonction de leur maturité qu’ils changent de couleur. Plus un poivron est mûr, plus il est rouge. Le vert est croquant, fruité avec un brin d’amertume, le rouge est doux et presque sucré, quant au jaune, il est tendre, doux et juteux.",
        link: "https://www.jardiner-malin.fr/fiche/poivron.html",
      },
    ],
  },
  {
    image: Img_plat,
    path: "/plats",
    imageAlt: "Plat",
    colors: [
      "rgba(168, 41, 27, .81)",
      "rgb(168, 41, 27)",
    ],
    descriptions: [
      {
        image: Accueil_poulet_haricots,
        alt: "Poulets et haricots",
        text:
          "Moins gras que le porc et le bœuf, le poulet est une viande maigre de choix. En effet, elle contient peu de lipides, excepté sa peau que vous pouvez retirer afin de réduire l’apport en lipides. De plus, le poulet procure un effet rassasiant, freinant alors les terribles envies de grignotage. Cette volaille est donc idéale à consommer.",
        link:
          "https://www.observatoire-sante.fr/5-raisons-de-manger-du-poulet/",
      },
      {
        image: Accueil_salades,
        alt: "Salades",
        text:
          "Une salade composée idéale sur le plan nutritionnel est une salade qui est dite « complète », c’est-à-dire qui comporte tous les nutriments indispensables au fonctionnement de notre organisme : des glucides, des lipides, des protéines, des fibres et des vitamines et minéraux variés pour répondre à tous les besoins de l’organisme.",
        link: "https://docteurbonnebouffe.com/salade-parfaitement-equilibree-composition/",
      },
    ],
  },
  {
    image: Img_desserts,
    path: "/desserts",
    imageAlt: "Desserts",
    colors: [
      "rgba(153, 110, 160, 0.64)",
      "rgba(153, 110, 160, 1)",
    ],
    descriptions: [
      {
        image: Accueil_mirabelles,
        alt: "Mirabelles",
        text:
          "Une bonne mirabelle possède une peau fine et tendue. Certaines sont recouvertes de taches de rousseur, ce n’est pas un souci. Il est préférable de choisir les mirabelles qui dégagent un parfum délicat. Le plus souvent consommé crue, la mirabelle est un fruit très juteux aux saveurs sucrées, mais elle est aussi délicieuse cuite, poêlée, dans un dessert ou une entrée.",
        link:
          "https://www.lanutrition.fr/tout-savoir-sur-les-mirabelles",
      },
      {
        image: Accueil_melon,
        alt: "Melon",
        text:
          "Le melon est un cucurbitacé (de la même famille que courgette, poivron, ou concombre…) et donc un légume d’été. Sa pleine saison est concentrée entre juin et septembre. Le melon se marie très bien avec les mets très salés comme le jambon de Bayonne ou la viande des Grisons ou encore avec certains fromages salés comme la fêta et même la mozzarella.",
        link: "https://www.fondation-louisbonduelle.org/legume/melon/",
      },
    ],
  },
  {
    image: Img_boissons,
    path: "/boissons",
    imageAlt: "Boissons",
    colors: [
      "rgba(200, 35, 35, 0.78)",
      "rgba(200, 35, 35, 1)",
    ],
    descriptions: [
      {
        image: Accueil_mojito,
        alt: "Mojito",
        text:
          "Le mojito est le cocktail le plus consommé en France. Il suffit de jeter un œil aux terrasses des bars, en été, pour réaliser que cette boisson compte de nombreux adeptes de tout âge. Composé de rhum, d’eau gazeuse, de citron et de feuilles de menthe, le mojito est une boisson incontournable et rafraîchissante.",
        link:
          "https://www.atelier-cocktail.com/histoire-mojito/",
      },
      {
        image: Accueil_smoothie,
        alt: "Smoothie",
        text:
          "En plus d’être très nutritifs, faibles en calories et bons pour la santé, les smoothies hydratent et apportent un petit plaisir sain. Et puis faire des smoothies, c’est quand même assez fun. Les smoothies ont l’avantage de conserver les fibres des fruits et légumes, du coup peu importe la recette, on obtiendra toujours notre dose de vitamine A, vitamine C, antioxydants ou encore oligo-éléments  dans une seule boisson.",
        link: "https://urlz.fr/dCLf",
      },
    ],
  },
  {
    image: Img_sauces,
    path: "/sauces",
    imageAlt: "Sauces",
    colors: [
      "rgba(193, 222, 238, 0.29)",
      "rgba(193, 222, 238, 1)",
    ],
    descriptions: [
      {
        image: Accueil_herbedeprovence,
        alt: "Herbes de Provence",
        text:
          "Les herbes de Provence comptent parmi les mélanges d'herbes les plus fameux et suffisent à elles seules à évoquer le soleil, le ciel bleu et les senteurs merveilleuses de la garrigue. Ingrédient incontournable de la cuisine méditerranéenne, elles ont la particularité de garder, une fois séchées, tout leur pouvoir aromatique. Les plantes traditionnellement présentes dans le mélange sont thym, romarin, sarriette, marjolaine et basilic ",
        link:
          "https://www.ducros.fr/le-secret-des-epices/les-herbes-de-provence",
      },
      {
        image: Accueil_curry,
        alt: "Curry",
        text:
          "Vous reconnaîtrez un curry de bonne qualité si vous pouvez distinguer différents pigments de couleur correspondant aux épices contenues dedans. Un curry indien ne doit pas contenir de sel, les nombreuses épices donnent suffisamment de goût si elles sont mélangées en bonnes proportions. Le curry classique a une couleur allant du jaune à l'orangé, il existe également un curry rouge (à base de piments rouges) et un curry vert (à base d'herbes)",
        link: "https://cutt.ly/5bOiu8U",
      },
    ],
  },
];

export default sections;
