/**
 * Simple interface for a tag
 */
export interface Tag {
    tag: string,
    snippet: string
}

/**
 * Simple class to contain all the tags
 */
export default class Tags
{
    /**
     * List of tags
     *
     * @type {Tag[]}
     */
	protected tagList: Tag[] = [
		{
			tag: '@Route("")',
			snippet: '@Route("${1}")'
		},
		{
			tag: '@Route("", methods={""})',
			snippet: '@Route("${1}", methods={"${2}"})'
		},
		{
			tag: '@ORM\\Id',
			snippet: '@ORM\\\\Id'
		},
		{
			tag: '@ORM\\datetime',
			snippet: '@ORM\\\\Column(type="datetime_immutable")'
		},
		{
			tag: '@ORM\\int',
			snippet: '@ORM\\\\Column(type="integer", length=${1})'
		},
		{
			tag: '@ORM\\string',
			snippet: '@ORM\\\\Column(type="string", length=${1})'
		},
		{
			tag: '@ORM\\GeneratedValue',
			snippet: '@ORM\\\\GeneratedValue'
		},
		{
			tag: '@ORM\\Entity(repositoryClass=NameRepository::class)',
			snippet: '@ORM\\\\Entity(repositoryClass=${1}Repository::class)'
		},
	]

    /**
     * Get the tag list for completions
     *
     * @returns {Tag[]}
     */
    get list(): Tag[]
    {
        return this.tagList;
    }
}