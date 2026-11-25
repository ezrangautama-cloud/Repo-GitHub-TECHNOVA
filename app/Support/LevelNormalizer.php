<?php

namespace App\Support;

use Illuminate\Database\Eloquent\Builder;

class LevelNormalizer
{
    /**
     * Expand a level query string into bilingual search terms (Indonesian & English).
     *
     * @return array<int, string>
     */
    public static function expandSearchTerms(string $level): array
    {
        $normalized = strtolower(trim($level));

        return match ($normalized) {
            'pemula', 'beginner' => ['Pemula', 'BEGINNER'],
            'menengah', 'intermediate' => ['Menengah', 'INTERMEDIATE'],
            'lanjutan', 'advanced' => ['Lanjutan', 'ADVANCED'],
            default => [trim($level)],
        };
    }

    /**
     * Apply a bilingual level filter onto an Eloquent query builder.
     */
    public static function applyFilter(Builder $query, string $level, string $column = 'level'): Builder
    {
        $terms = self::expandSearchTerms($level);

        return $query->where(function (Builder $q) use ($terms, $column): void {
            foreach ($terms as $index => $term) {
                if ($index === 0) {
                    $q->where($column, 'like', "%{$term}%");
                } else {
                    $q->orWhere($column, 'like', "%{$term}%");
                }
            }
        });
    }
}
