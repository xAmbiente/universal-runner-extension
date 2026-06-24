import { LanguageRunner } from "../types";
import { findFile } from "../utils";

export const cs: LanguageRunner = {
  name: "C#",
  detect(root) {
    if (findFile(root, ".csproj")) return "dotnet run";
    if (findFile(root, ".sln")) return "dotnet run";
    return null;
  },
};
