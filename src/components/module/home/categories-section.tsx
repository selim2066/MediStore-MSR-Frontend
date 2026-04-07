
import { categoryService } from "@/service/category.service"
import { Tag } from "lucide-react"
import Link from "next/link"

export async function CategoriesSection() {
  const { data, error } = await categoryService.getCategories()

  if (error || !data?.data?.length) return null

  const categories = data.data

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">

        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Browse by Category
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Find exactly what you need from our wide range of medicine categories
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?categoryId=${category.id}`}
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/50 transition-colors">
                <Tag className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-sm font-medium text-center text-gray-700 dark:text-gray-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                {category.name}
              </span>
            </Link>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-10">
          <Link
            href="/shop"
            className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline underline-offset-4"
          >
            View all medicines →
          </Link>
        </div>
      </div>
    </section>
  )
}