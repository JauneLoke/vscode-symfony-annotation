# PHP symfony-annotation

Autocomplete annotation in Symfony app

## Features

* Completion snippet after `/**` above a class, function, class property
* Completion of block tags such as `@param`, `@return`, `@throws`
* Inferring of param and return types from signatures
* Configuration of template for each type of block completion

## Requirements

This extension has no dependencies.

## Extension Settings

This extension contributes the following settings:

* `symfony-annotation.gap`: set to `false` to disable the gap between the description and tags
* `symfony-annotation.returnGap`: set to `true` to add a gap between the param and return tags
* `symfony-annotation.returnVoid`: set to `false` to turn off the automatic void return type when it can't be determined
* `symfony-annotation.extra`: an array of extra tags to add to each php doc block (These can include tabstops and snippet variables)
* `symfony-annotation.useShortNames`: Whether we should use short type names. e.g. bool or boolean
* `symfony-annotation.qualifyClassNames`: When adding type hints for class names search namespace use statements and qualify the class
* `symfony-annotation.alignParams`: set to `true` to align params vertically and add appropriate spaces after param names
* `symfony-annotation.alignReturn`: set to `true` to align return vertically with above params statements, this setting requires align params to also be active
* `symfony-annotation.varDescription`: set to `true` to include a description placeholder for `@var` completions. If you specify a string this will be the default placeholder text
* `symfony-annotation.paramDescription`: set to `true` to include a description placeholder for `@param` completions. If you specify a string this will be the default placeholder text
* `symfony-annotation.returnDescription`: set to `true` to include a description placeholder for `@return` completions. If you specify a string this will be the default placeholder text
* `symfony-annotation.author`: An object containing your default author tag settings
* `symfony-annotation.functionTemplate`: See below for how to set up symfony-annotation templates
* `symfony-annotation.propertyTemplate`: See below for how to set up symfony-annotation templates
* `symfony-annotation.classTemplate`: See below for how to set up symfony-annotation templates

### Templating

If you want more control over the order or gap settings on your php doc bloc or you want different things for properties vs class templates
you can start customising the template configuration objects. These are the config options `functionTemplate`, `propertyTemplate` and
`classTemplate`.

#### Default set up for function

The below is the default set up for a function. The order of the keys represents the output order. There are no specific options in each
config option per key to add additional control.

```json
    {
        "message": {},
        "param": {},
        "return": {},
        "extra": {}
    }
```

#### Supported template keys

| Key             | Aplies to type  | Description                                                                       |
|-----------------|-----------------|-----------------------------------------------------------------------------------|
| message         | All             | Space for entering a description of your block                                    |
| extra           | All             | Adds in your custom tags from the extra config                                    |
| param           | Function        | Function @param items                                                             |
| return          | Function        | Function @return item                                                             |
| var             | Property        | Property @var item                                                                |
| *               | All             | This is for any key that is unmatched you can use the content option to add a tag |

#### Supported template config options

| Option          | Aplies to key(s) | Description                                    |
|-----------------|------------------|------------------------------------------------|
| gapBefore       | All              | Adds a gap before the tag section starts       |
| gapAfter        | All              | Adds a gap after the tag section ends          |
| content         | *                | Adds a gap after the tag section ends          |

#### Configured function template example

In the example below we have added some gap configuration and removed the return tag for our template as well as
changing the default order. This means we'll never have a @return tag and extra comes before the params. It's also
worth pointing out that the gapAfter in the message is the same as setting the gap config option in the main config
to true.

```json
    {
        "message": {
            "gapAfter": true
        },
        "extra": {},
        "param": {
            "gapBefore": true
        },
    }
```

#### Configured function with extra content and placeholders

The example below won't have a return tag and will add in an author tag with correct placeholders depending on
how many options you have. You can put in placeholders by using `###` in place of the tab stop number and it
will be calculated at generation time.

```json
    {
        "message": {
            "gapAfter": true
        },
        "param": {
            "gapBefore": true
        },
        "author": {
            "content": "@author ${###:Neil Brayfield} <${###:neil@test.com}>"
        }
    }
```

## Supported Symfony Annotation tags

Please see below for a list of supported tags and their snippets. These tags are available within a symfony annotation
and can be triggered by typing @ then another characted (Provided your vscode settings allow).

| Tag                                   | Snippet                                                  |
| ------------------------------------- | -------------------------------------------------------- |
| @Route("")                            | @Route("${1}")                                           |
| @Route("", methods={""})              | @Route("${1}", methods={"${2}"})                         |
| @ORM\\Id                              | @ORM\\\\Id                                               |
| @ORM\\int                             | @ORM\\\\Column(type="integer", length=${1})              |
| @ORM\\string                          | @ORM\\\\Column(type="string", length=${1})               |
| @ORM\\datetime                        | @ORM\\\\Column(type="datetime_immutable")                |
| @ORM\\GeneratedValue                  | @ORM\\\\GeneratedValue                                   |