import { LanguageRunner } from "../types";
import { findFile, exists, rootFile, shellQuote, stem } from "../utils";

export const java: LanguageRunner = {
  name: "Java",
  detect(root) {
    // Maven
    if (exists(rootFile(root, "pom.xml"))) return "mvn compile exec:java";

    // Gradle
    if (exists(rootFile(root, "build.gradle")) || exists(rootFile(root, "build.gradle.kts"))) {
      return "./gradlew run";
    }

    // Plain .java file
    const file = findFile(root, ".java");
    if (!file) return null;

    const className = stem(file);
    return `javac ${shellQuote(file)} && java -cp ${shellQuote(require("path").dirname(file))} ${className}`;
  },
};
