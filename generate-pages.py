def main():
    pageNames = ["illustration", "books", "animation", "about"]
    templateFilePath = "template.html"
    invertedThemePages = ["books"]

    with open(templateFilePath, 'r') as file:
        templateFileContents = file.read()

    for pageName in pageNames:
        args = {
            "page": pageName,
            "theme": "inverted" if pageName in invertedThemePages else ""
        }

        for pageNameForArgs in pageNames:
            args["underlined_" + pageNameForArgs] = "underlinedNav" if pageNameForArgs == pageName else ""

        fileContents = templateFileContents

        for key, value in args.items():
            fileContents = fileContents.replace("[[" + key + "]]", value)

        outputFilePath = pageName + "/index.html" if pageName != "illustration" else "index.html"

        with open(outputFilePath, "w") as outputFile:
            outputFile.write(fileContents)

if __name__ == "__main__":
    main()