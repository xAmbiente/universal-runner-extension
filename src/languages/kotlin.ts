import { LanguageRunner } from "../types";
import { findFile, exists, rootFile, shellQuote, stem } from "../utils";

export const kotlin: LanguageRunner = {
  name: "Kotlin",
  detect(root) {
    // Gradle (most Kotlin projects)
    if (exists(rootFile(root, "build.gradle.kts")) || exists(rootFile(root, "build.gradle"))) {
      return "./gradlew run";
    }

    const file = findFile(root, ".kt");
    if (!file) return null;

    const jar = `${stem(file)}.jar`;
    return `kotlinc ${shellQuote(file)} -include-runtime -d ${jar} && java -jar ${jar}`;
  },
};
