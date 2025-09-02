export function getCategoryColor(category: string): string {
  switch (category.toLowerCase()) {
    case "cafe":
      return "#D2691E"; // marron café
    case "sport":
      return "#1E90FF"; // bleu sport
    case "camping":
      return "#228B22"; // vert nature
    case "culture":
      return "#8A2BE2"; // violet culture
    case "travel":
      return "#FF8C00"; // orange voyage
    case "food":
      return "#FF6347"; // rouge tomate
    case "music":
      return "#FFD700"; // jaune or
    default:
      return "#808080"; // gris par défaut
  }
}
