import type { FC } from 'hono/jsx'

type Data = {
  error?: Record<string, string[] | undefined>
  email?: string;
  password?: string;
}

export const LoginForm: FC<{ data?: Data }> = ({ data }) => {
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-center">ログイン</h1>
      <div>
        <form className="space-y-6" method='post' action='/login'>
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-medium">メールアドレス：</label>
            <input
              type="email"
              name="email"
              value={data?.email}
              className="h-12 px-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {data?.error?.email && <p class="text-red-500 text-xs italic">{data.error.email}</p>}
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-lg font-medium">パスワード：</label>
            <input
              type="password"
              name="password"
              value={data?.password}
              className="h-12 px-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {data?.error?.password && <p class="text-red-500 text-xs italic">{data.error.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-blue-500 text-white text-lg font-bold rounded-md hover:bg-blue-600"
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  )
}
